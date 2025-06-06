const API_URLS = {
    BASE_URL: "http://localhost:8088/",
    //SERVICE URLS
    GET_SERVICES: "/SGSERVICES/getServices",
    UPDATEA_SERVICE_SHOW : "/SGSERVICES/updateShow/",
    UPLODAD_SERVICES: "/SGSERVICES/uploadservice",
    GET_SELECTED_SERVICES: "/SGSERVICES/getSelected",
    UPDATE_SERVICES:"/SGSERVICES/updateservice",
    GET_SERVICE_NAME_ID:"/SGSERVICES/ServiceNames",

    // PRODUCT URLS
    GET_PRODUCT: "/SGPRODUCTS/getproducts",
    UPDATE_PRODUCT_SHOW : "/SGPRODUCTS/updateShow/",
    UPLODAD_PRODUCT: "/SGPRODUCTS/uploadproduct",
    GET_SELECTED_PRODUCT: "/SGPRODUCTS/getSelected",
    UPDATE_PRODUCT:"/SGPRODUCTS/updateproduct",

    // PORTFOLIO URLS
    GET_PORTFOLIO: "/SGPORTFOLIO/getportfolio",
    UPDATE_PORTFOLIO_SHOW : "/SGPORTFOLIO/updateShow/",
    UPLODAD_PORTFOLIO: "/SGPORTFOLIO/uploadportfolio",
    GET_SELECTED_PORTFOLIO: "/SGPORTFOLIO/getSelectedportfolio",
    UPDATE_PORTFOLIO:"/SGPORTFOLIO/updateportfolio",
    UPLOAD_SECTORS:"/SGPORTFOLIO/uploadsector",
    GET_SECTORS:"/SGPORTFOLIO/getSectors",

    // SUBSERVICE URLS
    UPLOAD_SUBSERVICES: "/SGSERVICES/uploadsubservice",
    GET_SUBSERVICES:"/SGSERVICES/getsubservices",
    GET_SUBSERVICES_BY_SERVICEID: "/SGSERVICES/getsubservices/",
    DELETE_SUBSERVICE: "/SGSERVICES/delete/",

    // USER URLS
    UPLOAD_USERS:"/SGUSER/saveuser",
    GET_USERS:"/SGUSER/getalluserdetails"
  };
  
  export default API_URLS;
  