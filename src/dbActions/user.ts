import { RowData, pool } from "../db/dbConnection";

export const registerUser = async (name: string, email: string, password: string, userName: string) => {
    console.log('call af_tracker.user_registerUser(?,?,?,?)', [name, email, password, userName]);
    let [result] = await pool.query('call af_tracker.user_registerUser(?,?,?,?)', [name, email, password, userName])
    return result as RowData
}
export const loginUser = async (_Email: string, _Password: string) => {
    console.log('call af_tracker.user_loginUser(?,?)', [_Email, _Password]);
    let [result] = await pool.execute('call af_tracker.user_loginUser(?,?)', [_Email, _Password])
    return result as RowData
}
