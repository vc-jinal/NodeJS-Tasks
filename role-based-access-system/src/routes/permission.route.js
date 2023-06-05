import { Router } from "express";
const route = Router();
import query from "../db/query.js";

// get all permissions for a role.
route.get("/roles/permissions/:roleId", async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const permission = await query(`SELECT p.name FROM permission p INNER JOIN role_permission rp ON rp.permission_id = p.id WHERE rp.role_id =${roleId}`);
        if (permission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Permissions fetched successfully", data: permission });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
});

//add permission to role
route.post('/add/permission/:roleId/:permissionId', async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const permissionId = req.params.permissionId;
        const permission = await query(`INSERT INTO role_permission(role_id,permission_id) VALUES(${roleId},${permissionId}) `)
        if (permission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Added permission to Role", data: permission })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

//delete permission of role
route.delete('/delete/permission/:roleId/:permissionId', async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const permissionId = req.params.permissionId;
        const deletePermission = await query(`DELETE FROM role_permission where role_id=${roleId} and permission_id=${permissionId}`)
        if (deletePermission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Deleted permission to Role", data: deletePermission })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

//delete permission
route.delete('/permission/:permissionId', async (req, res) => {
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
route.put('/update/permission/:permissionId', async (req, res) => {
    try {
        const permissionId = req.params.permissionId;
        const permissionName = req.body;
        const updatedPermissionName = await query(`UPDATE permission SET name='${permissionName}' where id=${permissionId}`)
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