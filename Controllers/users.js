const User = require('../Models/User')

const getUserControler = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(201).json(user)
    }
    catch (err) {
        res.status(500).json({ message: `User not found` })
    }
}

const getUserFriends = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    )
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    )

    res.status(201).json(formattedFriends);
}

const addRemoveFriend = async (req, res) => {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id)
    }
    else {
        user.friends.push(friendId);
        friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    )

    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    )

    res.status(201).json(formattedFriends);
}

module.exports = { getUserControler, getUserFriends, addRemoveFriend }