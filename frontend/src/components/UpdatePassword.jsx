import { useState } from 'react'
import { updatePassword } from '../api/user'
import { useAlertContext } from '../hooks/useCustomContext'

const UpdatePassword = ({ closePopup }) => {
    const [oldPwd, setOldPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [confirmPwd, setConfirmPwd] = useState("")
    const { alertError, alertSuccess } = useAlertContext()

    const handleSubmit = async () => {
        const res = await updatePassword(oldPwd, newPwd, confirmPwd)
        switch (res.code) {
            case 1:
                alertError(res.message)
                break
            case 400:
                alertError(res.message)
                break
            case 200:
                alertSuccess(res.message)
                break
            default:
                throw new Error("Unknown code")
        }
        closePopup()
    }
    return (
        <div className='col popup-container'>
            <div className='popup-wrapper g2'>
                <form className='col update-password-form g1'>
                    <label>
                        旧密码：
                        <input
                            name="oldPwd"
                            type="password"
                            value={oldPwd}
                            onChange={(e) => setOldPwd(e.target.value)}
                        />
                    </label>
                    <label>
                        新密码：
                        <input
                            name="newPwd"
                            type="password"
                            value={newPwd}
                            onChange={(e) => setNewPwd(e.target.value)}
                        />
                    </label>
                    <label>
                        确认新密码：
                        <input
                            name="confirmPwd"
                            type="password"
                            value={confirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                    </label>
                </form>
                <div className='row g1 flex-center'>
                    <button className='small white' onClick={closePopup}>取消</button>
                    <button className='small blue60' onClick={handleSubmit}>确认</button>
                </div>
            </div>

        </div>
    )
}

export default UpdatePassword