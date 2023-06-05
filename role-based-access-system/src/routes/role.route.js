import { Router } from "express";
const route = Router();
import query from "../db/query.js";
import connection from "./db/connection.js";

//update role name
route.put('roles/:roleId', async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const roleName = req.body;
        const updatedRoleName = await query(`UPDATE roles SET name='${roleName}' where id=${roleId}`)
        if (updatedRoleName.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "role name  Updated", data: updatedRoleName })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

//delete role
route.delete('/role/:roleId', async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const deletedRoleId = await query(`DELETE FROM roles WHERE id=${roleId}`)
        if (deletedRoleId.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Role Deleted", data: deletedRoleId })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" })
    }
})

export default route;