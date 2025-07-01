import * as fs from 'fs';
import * as path from 'path';

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Hackathon Backend API',
    description: 'API for plan and association management system',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@hackathon.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    },
    {
      url: 'https://api.hackathon.com',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          age: { type: 'integer', minimum: 18 },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          country: { type: 'string' },
          city: { type: 'string' },
          profilePicture: { type: 'string' },
          role: { type: 'string', enum: ['volunteer', 'associationOwner'] },
          interests: { type: 'array', items: { type: 'string' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 }
        }
      },
      RegisterRequest: {
        type: 'object',
        required: ['email', 'password', 'name', 'age', 'gender', 'role', 'country', 'city'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 8 },
          name: { type: 'string' },
          age: { type: 'integer', minimum: 18 },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          role: { type: 'string', enum: ['volunteer', 'associationOwner'] },
          country: { type: 'string' },
          city: { type: 'string' },
          profilePicture: { type: 'string' },
          associationData: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              image_url: { type: 'string' }
            }
          }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              email: { type: 'string' },
              name: { type: 'string' },
              profilePicture: { type: 'string' },
              token: { type: 'string' }
            }
          },
          message: { type: 'string' }
        }
      },
      Plan: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          volunteerNumber: { type: 'integer' },
          category_id: { type: 'string', format: 'uuid' },
          associationId: { type: 'string', format: 'uuid' },
          destinationId: { type: 'string', format: 'uuid' },
          isActive: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreatePlanRequest: {
        type: 'object',
        required: ['name', 'description', 'startDate', 'endDate', 'volunteerNumber', 'destinationId', 'category_id'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          volunteerNumber: { type: 'integer' },
          destinationId: { type: 'string', format: 'uuid' },
          category_id: { type: 'string', format: 'uuid' },
          fees: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                fees: { type: 'string' }
              }
            }
          }
        }
      },
      Association: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string' },
          image_url: { type: 'string' },
          isApproved: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Location: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          city: { type: 'string' },
          country: { type: 'string' },
          address: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Review: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          rating: { type: 'number', minimum: 1.0, maximum: 5.0 },
          comment: { type: 'string' },
          volunteerId: { type: 'string', format: 'uuid' },
          associationId: { type: 'string', format: 'uuid' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateReviewRequest: {
        type: 'object',
        required: ['rating', 'comment'],
        properties: {
          rating: { type: 'number', minimum: 1.0, maximum: 5.0 },
          comment: { type: 'string', maxLength: 1000 }
        }
      },
      UpdateReviewRequest: {
        type: 'object',
        properties: {
          rating: { type: 'number', minimum: 1.0, maximum: 5.0 },
          comment: { type: 'string', maxLength: 1000 }
        }
      },
      GuestVolunteerForm: {
        type: 'object',
        required: ['name', 'email', 'age', 'gender', 'country', 'city', 'planId'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 100 },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          age: { type: 'integer', minimum: 16, maximum: 100 },
          gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
          country: { type: 'string', minLength: 2, maxLength: 100 },
          city: { type: 'string', minLength: 2, maxLength: 100 },
          planId: { type: 'string', format: 'uuid' },
          message: { type: 'string', maxLength: 1000 }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          status: { type: 'integer' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      }
    }
  },
  paths: {
    '/api/auth/login': {
      post: {
        summary: 'Login user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        summary: 'Register new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/auth/me': {
      get: {
        summary: 'Get current user profile',
        tags: ['Authentication'],
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/User' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/auth/google': {
      get: {
        summary: 'Google OAuth login',
        tags: ['Authentication'],
        responses: {
          '302': {
            description: 'Redirect to Google OAuth'
          }
        }
      }
    },
    '/api/auth/google/callback': {
      get: {
        summary: 'Google OAuth callback',
        tags: ['Authentication'],
        responses: {
          '200': {
            description: 'Google login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthResponse' }
              }
            }
          }
        }
      }
    },
    '/api/users': {
      post: {
        summary: 'Create user (admin only)',
        tags: ['Users'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/User' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/plan': {
      get: {
        summary: 'Get all plans',
        tags: ['Plans'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', default: 1 },
            description: 'Page number'
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', default: 10 },
            description: 'Number of items per page'
          }
        ],
        responses: {
          '200': {
            description: 'Plans retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Plan' }
                    },
                    total: { type: 'integer' },
                    page: { type: 'integer' },
                    limit: { type: 'integer' }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create new plan',
        tags: ['Plans'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreatePlanRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Plan created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Plan' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/plan/category/{categoryName}': {
      get: {
        summary: 'Get plans by category name',
        tags: ['Plans'],
        parameters: [
          {
            in: 'path',
            name: 'categoryName',
            required: true,
            schema: { type: 'string' },
            description: 'Category name'
          }
        ],
        responses: {
          '200': {
            description: 'Plans retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Plan' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Category not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/plan/filter': {
      get: {
        summary: 'Filter plans',
        tags: ['Plans'],
        parameters: [
          {
            in: 'query',
            name: 'categoryId',
            schema: { type: 'string', format: 'uuid' },
            description: 'Category ID'
          },
          {
            in: 'query',
            name: 'minFees',
            schema: { type: 'number' },
            description: 'Minimum fees'
          },
          {
            in: 'query',
            name: 'isActive',
            schema: { type: 'boolean' },
            description: 'Active status'
          },
          {
            in: 'query',
            name: 'isPaid',
            schema: { type: 'boolean' },
            description: 'Paid status'
          },
          {
            in: 'query',
            name: 'country',
            schema: { type: 'string' },
            description: 'Country filter'
          },
          {
            in: 'query',
            name: 'city',
            schema: { type: 'string' },
            description: 'City filter'
          }
        ],
        responses: {
          '200': {
            description: 'Filtered plans retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Plan' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/plan/{id}': {
      get: {
        summary: 'Get plan by ID',
        tags: ['Plans'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Plan ID'
          }
        ],
        responses: {
          '200': {
            description: 'Plan retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Plan' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Plan not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/admin/associations/pending': {
      get: {
        summary: 'Get pending associations',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'Pending associations retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Association' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/admin/associations/approve/{userId}': {
      put: {
        summary: 'Approve association',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'User ID'
          }
        ],
        responses: {
          '200': {
            description: 'Association approved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/admin/associations/reject/{userId}': {
      put: {
        summary: 'Reject association',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'User ID'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  reason: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Association rejected successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/admin/plans/{id}': {
      delete: {
        summary: 'Delete plan',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Plan ID'
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  reason: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Plan deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/location': {
      get: {
        summary: 'Get all locations',
        tags: ['Locations'],
        responses: {
          '200': {
            description: 'Locations retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Location' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/location/search': {
      get: {
        summary: 'Search locations',
        tags: ['Locations'],
        parameters: [
          {
            in: 'query',
            name: 'search',
            schema: { type: 'string' },
            description: 'Search term'
          },
          {
            in: 'query',
            name: 'sortBy',
            schema: { type: 'string' },
            description: 'Sort field'
          },
          {
            in: 'query',
            name: 'sortOrder',
            schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' },
            description: 'Sort order'
          }
        ],
        responses: {
          '200': {
            description: 'Locations search results',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Location' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/location/{id}': {
      get: {
        summary: 'Get location by ID',
        tags: ['Locations'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Location ID'
          }
        ],
        responses: {
          '200': {
            description: 'Location retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Location' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Location not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/associations/{associationId}/reviews': {
      post: {
        summary: 'Create review for association',
        tags: ['Reviews'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'associationId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Association ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateReviewRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Review created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Review' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      get: {
        summary: 'Get reviews for association',
        tags: ['Reviews'],
        parameters: [
          {
            in: 'path',
            name: 'associationId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Association ID'
          }
        ],
        responses: {
          '200': {
            description: 'Reviews retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Review' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/volunteers/{volunteerId}/reviews': {
      get: {
        summary: 'Get reviews by volunteer',
        tags: ['Reviews'],
        parameters: [
          {
            in: 'path',
            name: 'volunteerId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Volunteer ID'
          }
        ],
        responses: {
          '200': {
            description: 'Reviews retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Review' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/reviews/{reviewId}': {
      put: {
        summary: 'Update review',
        tags: ['Reviews'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Review ID'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateReviewRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Review updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Review' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      delete: {
        summary: 'Delete review',
        tags: ['Reviews'],
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'reviewId',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Review ID'
          }
        ],
        responses: {
          '200': {
            description: 'Review deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/upload': {
      post: {
        summary: 'Upload file',
        tags: ['Files'],
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'File uploaded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'object',
                      properties: {
                        filename: { type: 'string' },
                        url: { type: 'string' }
                      }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/association': {
      get: {
        summary: 'Get all associations',
        tags: ['Associations'],
        responses: {
          '200': {
            description: 'Associations retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Association' }
                    },
                    message: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/association/me': {
      get: {
        summary: 'Get current user\'s association',
        tags: ['Associations'],
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'Association retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Association' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/association/{id}': {
      get: {
        summary: 'Get association by ID',
        tags: ['Associations'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string', format: 'uuid' },
            description: 'Association ID'
          }
        ],
        responses: {
          '200': {
            description: 'Association retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: { $ref: '#/components/schemas/Association' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Association not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/volunteer': {
      post: {
        summary: 'Submit guest volunteer form',
        tags: ['Guest'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GuestVolunteerForm' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Volunteer form submitted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    }
  }
};

// Convert to YAML and write to file
const yaml = require('yaml');
const yamlString = yaml.stringify(swaggerDoc, { indent: 2 });

fs.writeFileSync('swagger.yaml', yamlString);
console.log('Swagger documentation generated successfully!'); 