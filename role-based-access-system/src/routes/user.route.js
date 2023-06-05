import { Router } from "express";
const route = Router();
import query from "../db/query.js";

//get role for user
route.get('/:userId/role', async (req, res) => {
    try {
        const userId = req.params.userId;
        const getUserRole = await query(`SELECT r.name 
        FROM roles r
        INNER JOIN user u 
        ON u.id=r.user_id
        WHERE u.id=${userId}`)
        if (getUserRole.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Get Role of User", data: getUserRole })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

//get permission for user
route.get('/:userId/permission', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPermission = await query(`SELECT p.name
        FROM permission p 
        INNER JOIN role_permission rp
        ON rp.permission_id=p.id
        INNER JOIN user u
        ON u.id=rp.role_id
        WHERE u.id=${userId}
        `)
        if (userPermission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Get permission of user", data: userPermission })
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" })
    }
})

export default route;