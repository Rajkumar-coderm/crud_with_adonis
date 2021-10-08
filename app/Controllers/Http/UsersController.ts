// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UsersController {
    public async index() {
        const data = await Database.from('users').select('*')
        return data
    }
    public async store({ request, response }) {
        await Database.insertQuery().table('users').insert(
            {
                name: request.input('name'),
                email: request.input('email'),
                password: request.input('password')
            })
        return response.status(200).json({ message: "succefully creates user" })
    }

    public async update({ request, response, params }) {
        await Database.from('users')
            .where('id', params.id)
            .update({ password: request.input('password') })
        return response.status(200).json({ message: "updated successfully in databases.." })

    }
    public async delete({ request, response, params }) {
        await Database.from('users')
            .where('id', params.id)
            .delete()
        return response.status(200).json({message:"user delete successfully"})

    }
};

