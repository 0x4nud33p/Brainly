export const getFolders = async () => {
    try {
      const response = await fetch("/api/folders");
      if (!response.ok) {
        const errorBody = await response.json();
        console.log("Error while fetching folders",errorBody);
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      return null;
    }
  };
  