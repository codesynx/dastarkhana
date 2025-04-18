import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'dastarkhana-backend',
      contact: {
        name: 'Abilmansur Omar',
        email: 'omarabilmansur@gmail.com',
      },
      version: 'v1.0',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
        description: 'Бэкенд URL',
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          tags: ['auth'],
          summary: 'Жаңа тұтынушыны тіркеу',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Тұтынушы сәтті тіркелді' },
          },
        },
      },
      "/auth/registerDeliveryMan": {
        post: {
          tags: ['auth'],
          summary: 'Жаңа жеткізуші қызметкерді тіркеу',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeliveryMan',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Жеткізуші қызметкер сәтті тіркелді' },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ['auth'],
          summary: 'Тұтынушы ретінде кіру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phone: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Тұтынушы сәтті кірді' },
          },
        },
      },
      "/auth/loginAdmin": {
        post: {
          tags: ['auth'],
          summary: 'Әкімші ретінде кіру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Әкімші сәтті кірді' },
          },
        },
      },
      "/auth/loginDeliveryMan": {
        post: {
          tags: ['auth'],
          summary: 'Жеткізуші қызметкер ретінде кіру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    phone: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Жеткізуші қызметкер сәтті кірді' },
          },
        },
      },
      "/auth/customers": {
        get: {
          tags: ['customers'],
          summary: 'Барлық тұтынушыларды алу',
          responses: {
            '200': {
              description: 'Барлық тұтынушылардың тізімі',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Customer',
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/customer/{id}": {
        get: {
          tags: ['customers'],
          summary: 'ID бойынша тұтынушыны алу',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Тұтынушы табылды' },
            '404': { description: 'Тұтынушы табылмады' },
          },
        },
        put: {
          tags: ['customers'],
          summary: 'Тұтынушыны жаңарту',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Тұтынушы сәтті жаңартылды' },
          },
        },
        delete: {
          tags: ['customers'],
          summary: 'Тұтынушыны жою',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Тұтынушы сәтті жойылды' },
            '404': { description: 'Тұтынушы табылмады' },
          },
        },
      },
      "/auth/DeliveryMan": {
        get: {
          tags: ['DeliveryMans'],
          summary: 'Барлық жеткізуші қызметкерлерді алу',
          responses: {
            '200': {
              description: 'Барлық жеткізуші қызметкерлердің тізімі',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/DeliveryMan',
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/auth/DeliveryMan/{id}": {
        get: {
          tags: ['DeliveryMans'],
          summary: 'ID бойынша жеткізуші қызметкерді алу',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Жеткізуші қызметкер табылды' },
            '404': { description: 'Жеткізуші қызметкер табылмады' },
          },
        },
        put: {
          tags: ['DeliveryMans'],
          summary: 'Жеткізуші қызметкерді жаңарту',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DeliveryMan',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Жеткізуші қызметкер сәтті жаңартылды' },
          },
        },
        delete: {
          tags: ['DeliveryMans'],
          summary: 'Жеткізуші қызметкерді жою',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Жеткізуші қызметкер сәтті жойылды' },
            '404': { description: 'Жеткізуші қызметкер табылмады' },
          },
        },
      },
      "/products": { 
        get: {
          tags: ['products'],
          summary: 'Барлық өнімдерді алу',
          responses: {
            '200': {
              description: 'Барлық өнімдердің тізімі',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['products'],
          summary: 'Жаңа өнім құру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Өнім сәтті құрылды' },
          },
        },
      },
      "/products/{id}": {
        get: {
          tags: ['products'],
          summary: 'ID бойынша өнімді алу',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Өнім табылды' },
            '404': { description: 'Өнім табылмады' },
          },
        },
        put: {
          tags: ['products'],
          summary: 'Өнімді жаңарту',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Өнім сәтті жаңартылды' },
          },
        },
        delete: {
          tags: ['products'],
          summary: 'Өнімді жою',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Өнім сәтті жойылды' },
            '404': { description: 'Өнім табылмады' },
          },
        },
      },
      "/categories": {
        get: {
          tags: ['categories'],
          summary: 'Барлық санаттарды алу',
          responses: {
            '200': {
              description: 'Барлық санаттардың тізімі',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Category',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['categories'],
          summary: 'Жаңа санат құру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Санат сәтті құрылды' },
          },
        },
      },
      "/orders": {
        get: {
          tags: ['orders'],
          summary: 'Барлық тапсырыстарды алу',
          responses: {
            '200': {
              description: 'Барлық тапсырыстардың тізімі',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['orders'],
          summary: 'Жаңа тапсырыс құру',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          responses: {
            '201': { description: 'Тапсырыс сәтті құрылды' },
          },
        },
      },
      "/orders/customer/{customerId}": {
        get: {
          tags: ['orders'],
          summary: 'Тұтынушы ID бойынша барлық тапсырыстарды алу',
          parameters: [
            {
              name: 'customerId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Тапсырыстар сәтті алынды',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Order',
                    },
                  },
                },
              },
            },
            '404': {
              description: 'Бұл тұтынушы үшін тапсырыстар табылмады',
            },
            '500': {
              description: 'Сервер қатесі',
            },
          },
        },
      },
      "/orders/{id}": {
        get: {
          tags: ['orders'],
          summary: 'ID бойынша тапсырысты алу',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Тапсырыс табылды' },
            '404': { description: 'Тапсырыс табылмады' },
          },
        },
        put: {
          tags: ['orders'],
          summary: 'Тапсырысты жаңарту',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Order',
                },
              },
            },
          },
          responses: {
            '200': { description: 'Тапсырыс сәтті жаңартылды' },
          },
        },
        delete: {
          tags: ['orders'],
          summary: 'Тапсырысты жою',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': { description: 'Тапсырыс сәтті жойылды' },
            '404': { description: 'Тапсырыс табылмады' },
          },
        },
      },
    },
    components: {
      schemas: {
        Customer: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phone: { type: 'string' },
          },
        },
        DeliveryMan: {
          type: 'object',
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            phone: { type: 'string' },
            password: { type: 'string' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mainImage: { type: 'string' },
            price: { type: 'number', format: 'decimal' },
            otherImages: { type: 'array', items: { type: 'string' } },
            description: { type: 'string' },
            preparationDuration: { type: 'integer' },
            rating: { type: 'number', format: 'decimal' },
            sizes: { type: 'array', items: { type: 'string' } },
          },
        },
        Category: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            totalPrice: { type: 'number', format: 'decimal' },
            status: { type: 'string' },
            location: { type: 'string' },
            customerId: { type: 'integer' },
            deliveryManId: { type: 'integer' },
            orderItems: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  quantity: { type: 'integer' },
                  productId: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
