import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from "App/Models/User";

export default class UsersController {
    public async index() {
        const data = await User.all()
        return data
    }
    public async store({ request, response }: HttpContextContract) {
        const myimage=request.file('image')
        await myimage?.move(Application.tmpPath('uploads'))
        await User.create(
            {
                name: request.input('name'),
                email: request.input('email'),
                password: request.input('password')
                

            })
        return response.status(200).json({ message: "succefully creates user" })
    }

    public async update({ request, response, params }: HttpContextContract) {
        await User.query().where('id', params.id).update({ password: request.input('password') })
        return response.status(200).json({ message: "updated successfully in databases.." })
    }

    public async delete({ request, response, params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()
        return response.status(200).json({ message: "user delete successfully" })

    }


};

