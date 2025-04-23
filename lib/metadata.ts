import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  source?: string;
}

export async function getLinkMetadata(url: string): Promise<LinkMetadata> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const html = response.data;
    const $ = cheerio.load(html);
    const parsedUrl = new URL(url);
    
    // Determine source from hostname
    let source = '';
    const hostname = parsedUrl.hostname.toLowerCase();
    
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      source = 'youtube';
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      source = 'twitter';
    } else if (hostname.includes('instagram.com')) {
      source = 'instagram';
    } else if (hostname.includes('github.com')) {
      source = 'github';
    } else if (hostname.includes('medium.com')) {
      source = 'medium';
    } else if (hostname.includes('reddit.com')) {
      source = 'reddit';
    } else if (hostname.includes('linkedin.com')) {
      source = 'linkedin';
    } else {
      // Extract domain without subdomains
      const domainParts = hostname.split('.');
      source = domainParts.length > 1 ? 
        domainParts[domainParts.length - 2] : 
        hostname;
    }
    
    // Extract metadata
    const metadata: LinkMetadata = {
      source,
    };
    
    // Get title
    metadata.title = $('meta[property="og:title"]').attr('content') || 
                     $('meta[name="twitter:title"]').attr('content') || 
                     $('title').text() || 
                     '';
    
    // Get description
    metadata.description = $('meta[property="og:description"]').attr('content') || 
                           $('meta[name="twitter:description"]').attr('content') || 
                           $('meta[name="description"]').attr('content') || 
                           '';
    
    // Get image
    metadata.image = $('meta[property="og:image"]').attr('content') || 
                    $('meta[name="twitter:image"]').attr('content') || 
                    '';
    
    // Handle relative URLs for image
    if (metadata.image && !metadata.image.startsWith('http')) {
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
      metadata.image = new URL(metadata.image, baseUrl).toString();
    }
    
    // Get favicon
    let favicon = $('link[rel="icon"]').attr('href') || 
                  $('link[rel="shortcut icon"]').attr('href') || 
                  '/favicon.ico';
    
    // Handle relative URLs for favicon
    if (favicon && !favicon.startsWith('http')) {
      const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
      favicon = new URL(favicon, baseUrl).toString();
    }
    
    metadata.favicon = favicon;
    
    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: new URL(url).hostname,
      source: new URL(url).hostname.split('.')[0],
    };
  }
}

// Handle special cases for certain platforms
export function getEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // YouTube
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = '';
      
      if (hostname.includes('youtube.com')) {
        videoId = parsedUrl.searchParams.get('v') || '';
      } else if (hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.slice(1);
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Twitter/X
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      // Extract tweet ID and construct oembed URL
      const matches = parsedUrl.pathname.match(/\/status\/(\d+)/);
      if (matches && matches[1]) {
        return `https://platform.twitter.com/embed/Tweet.html?id=${matches[1]}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}