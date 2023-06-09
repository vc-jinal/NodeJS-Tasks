import { Router } from "express";
const route = Router();
import query from "../db/query.js";

//add permission to role
route.post('/', async (req, res) => {
    try {
        const { role_id, permission_id } = req.body;
        const getPermissionId = await query(`SELECT id from permission where id=${permission_id}`);
        const getRoleId = await query(`SELECT id from roles where id=${role_id}`);
        if (getPermissionId.length === 0 || getRoleId.length === 0) {
            res.send({ statusCode: 404, message: "Id not found" })
        }
        const permission = await query(`INSERT INTO role_permission(role_id,permission_id) 
        VALUES(${role_id},${permission_id})`)
        if (permission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Added permission to Role", data: permission })
    }
    catch (error) {
        console.log(error);
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

// get all permissions for a role.
route.get("/:roleId/permission", async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const permission = await query(`
        SELECT DISTINCT p.name FROM permission p 
        INNER JOIN role_permission rp 
        ON rp.permission_id = p.id 
        WHERE rp.role_id =${roleId}`);
        if (permission.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "Permissions fetched successfully", data: permission });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
});



//delete permission of role
route.delete('/:roleId/permission/:permissionId', async (req, res) => {
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

//update role name
route.put('/:roleId', async (req, res) => {
    try {
        const roleId = req.params.roleId;
        const { name } = req.body;
        const updatedRoleName = await query(`UPDATE roles SET name='${name}' where id=${roleId}`)
        if (updatedRoleName.affectedRows === 0) {
            return res.send({ statusCode: 404, message: "Data not found" });
        }
        return res.send({ statusCode: 200, message: "role name Updated", data: updatedRoleName })
    }
    catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
})

//delete role
route.delete('/:roleId', async (req, res) => {
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