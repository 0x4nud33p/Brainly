import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="font-mono text-center text-xs  text-blue-400">
        &copy; {new Date().getFullYear()} Brainly. Made with ❤️ by <span className='text-pink-400 font-bold'>Anudeep</span>. All rights reserved.
      </div>
    </footer>
  );
}
