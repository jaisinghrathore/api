import user from "../../modals/userRegistration.js";

async function existingUser(userId) {
    try {
        const existing = await user.findOne({ _id: userId });
        return existing;
    } catch (err) {
        console.log(err);
    }
}

export default existingUser;
