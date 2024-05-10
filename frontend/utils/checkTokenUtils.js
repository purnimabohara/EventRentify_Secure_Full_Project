export const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, considered expired for safety.");
      return true;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      if (Date.now() >= expirationTime) {
        e.preventDefault();
    localStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error decoding or parsing the token:", error);
      return true;
    }
};
