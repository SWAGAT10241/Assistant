# Virtual Assistant — Backend

Modern, scalable Node.js & Express REST API for the Virtual Assistant application.

---

## Folder Structure

```
backend/
├── config/
│   ├── env.js                # Centralized environment configuration
│   ├── db.js                 # MongoDB connection handler
│   ├── cloudinary.js         # Cloudinary asset storage initialization
│   └── token.js              # JWT signing utility
├── controllers/              # Thin HTTP request / response handlers
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── assistant.controller.js
│   ├── conversation.controller.js
│   └── message.controller.js
├── middlewares/              # Express middlewares
│   ├── auth.middleware.js    # JWT verification (cookies & Bearer headers)
│   ├── multer.middleware.js  # File upload configuration with size limits
│   └── error.middleware.js   # Global error handling and 404 response
├── models/                   # Mongoose schemas
│   ├── user.model.js
│   ├── assistant.model.js
│   ├── conversation.model.js
│   ├── message.model.js
│   ├── workspace.model.js
│   └── project.model.js
├── routes/                   # Scalable Express routers
│   ├── index.js              # Central router (/api)
│   ├── auth.routes.js        # /api/auth
│   ├── user.routes.js        # /api/user
│   ├── assistant.routes.js   # /api/assistants
│   ├── conversation.routes.js# /api/conversations
│   └── message.routes.js     # /api/messages
├── services/                 # Pure business logic layer
│   ├── ai.service.js         # Gemini prompt orchestration & intent parsing
│   ├── auth.service.js       # User auth & workspace onboarding
│   ├── user.service.js       # Profile & assistant updates
│   ├── assistant.service.js  # Assistant CRUD
│   ├── conversation.service.js# Conversation CRUD
│   └── message.service.js    # Message CRUD & pinning
├── utils/                    # Core helpers
│   ├── apiResponse.js        # Standardized { success, message, data } response
│   ├── apiError.js           # Standardized ApiError class
│   └── asyncHandler.js       # Wrapper to eliminate try/catch blocks
├── app.js                    # Express app configuration & middleware pipeline
├── index.js                  # Server entry point with graceful shutdown
└── .env.example              # Environment variables template
```

---

## Architectural Principles

1. **Separation of Concerns**:
   - Routes define endpoints and middleware chains.
   - Controllers handle HTTP params, cookies, and responses.
   - Services handle database queries, business rules, and external integrations (Gemini, Cloudinary).
   - Models define schemas and validation rules.

2. **Standardized Responses**:
   - Success responses format:
     ```json
     {
       "statusCode": 200,
       "success": true,
       "message": "Success message",
       "data": { ... }
     }
     ```
   - Error responses format:
     ```json
     {
       "statusCode": 400,
       "success": false,
       "message": "Specific error message",
       "errors": []
     }
     ```

3. **Security**:
   - HTTP-only authentication cookies prevent XSS token theft.
   - Passwords hashed using bcrypt (10 rounds).
   - Sensitive fields (passwords) automatically stripped upon JSON serialization.
   - CORS origin validation with support for multiple domains.
