
const response = {
    // Send a successful response with data
    sendSuccess: (res, data, statusCode = 200) => {
      res.status(statusCode).json({
        status: statusCode,
        success: true,
        data: data,
      });
    },
  
    // Send an error response with message
    sendError: (res, message, statusCode = 400) => {
      res.status(statusCode).json({
        status: statusCode,
        success: false,
        message: message,
      });
    },
  
    // Send a response when unauthorized
    sendUnauthorized: (res, message = 'Unauthorized') => {
      res.status(401).json({
        status: 401,
        success: false,
        message: message,
      });
    },
  
    // Send a response when resource is created
    sendCreated: (res, data) => {
      res.status(201).json({
        status: 201,
        success: true,
        data: data,
      });
    },
  
    // Send a response when resource not found
    sendNotFound: (res, message = 'Not Found') => {
      res.status(404).json({
        status: 404,
        success: false,
        message: message,
      });
    },
  
    // Send a server error response
    sendServerError: (res, message = 'Internal Server Error') => {
      res.status(500).json({
        success: false,
        message: message,
      });
    },
  };
  

  export default response;