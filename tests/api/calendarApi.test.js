import calendarApi from "../../src/api/calendarApi";


describe('Pruebas en el calendarApi', () => {

    test('debe de tener la configuración por defecto', () => {

        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_REACT_APP_API_URL)
    });

    test('debe de tener el "x-token" en el header de todas las peticiones', async () => {

        const user = {
            correo: 'test20@test.com',
            password: '123456'
        }

        const token = 'ABC-123-XYZ';

        localStorage.setItem('token', token);


        const res = await calendarApi.post('auth/login', user);

        expect(res.config.headers["x-token"]).toBe(token);
    }, 10000);
}); 