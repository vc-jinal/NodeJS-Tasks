import { Router } from "express";
const route = Router();
import query from "../db/query.js";

//delete permission
route.delete('/:permissionId', async (req, res) => {
    try {
        const permissionId = req.params.permissionId;
        const deletePermission = await query(`DELETE FROM permission WHERE id=${permissionId}`)
        if (deletePermission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Permission Deleted", data: deletePermission })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" })
    }
})

//update permission name 
route.put('/:permissionId', async (req, res) => {
    try {
        const permissionId = req.params.permissionId;
        const { name } = req.body;
        const updatedPermissionName = await query(`UPDATE permission SET name='${name}' where id=${permissionId}`)
        if (updatedPermissionName.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Permission Id Updated", data: updatedPermissionName })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

export default route;