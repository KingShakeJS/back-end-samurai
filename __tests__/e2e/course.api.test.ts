// import request from 'supertest'
import {app} from "../../src";
import request from 'supertest'

describe('/course', () => {
    beforeAll(async () => {
        await request(app)
            .delete('/__test__/data')
    })
    it('должен вернуть 200 и пустой массив', async () => {
        await request(app)
            .get('/courses')
            .expect(200, [])
    })

    it('должен вернуть 404 для несуществующего курса ', async () => {
        await request(app)
            .get('/courses/1')
            .expect(404)
    });

    it('не должен создать курс с не корректными входящими данными / 400', async () => {
        await request(app)
            .post('/courses')
            .send({
                title: ''
            })
            .expect(400)

        await request(app)
            .get('/courses')
            .expect(200, [])
    });

    let createdCourse: any = null
    it('должен создать курс с  корректными входящими данными / 201', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({
                title: 'in-incubator'
            })
            .expect(201)
        createdCourse = createRes.body
        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: 'in-incubator'
        })
        await request(app)
            .get('/courses')
            .expect(200, [createdCourse])

    });

    it('не должен обновить курс /400', async () => {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({title: ''})
            .expect(400)

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(200, createdCourse)

    });

    it('не должен обновить курс который не существует /400', async () => {
        await request(app)
            .put(`/courses/2`)
            .send({title: ''})
            .expect(400)

    });

    it('должен обновить курс с корректными данными /400', async () => {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({title: 'good title'})
            .expect(200)

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(200, {
                ...createdCourse, title: 'good title'
            })
    });

    let createdCourse2: any = null
    it('должен создать 2 курс с  корректными входящими данными / 201', async () => {
        const createRes = await request(app)
            .post('/courses')
            .send({
                title: 'in-incubator2'
            })
            .expect(201)

        createdCourse2 = createRes.body

        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: 'in-incubator2'
        })

    });


})