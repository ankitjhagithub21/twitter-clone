const { uploadImage } = require("../helpers/cloudinary");
const User = require("../models/userModel");

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};



const suggestedUsers = async (req, res) => {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized.",
            });
        }

        const users = await User.find({
            _id: { $nin: [...user.following, user._id] }
        }).select("fullName username profileImg");

        res.json({
            success: true,
            users,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { userIdToFollowUnfollow } = req.body;
        const currentUser = await User.findById(req.id);
        const userToFollowUnfollow = await User.findById(userIdToFollowUnfollow);

        if (!currentUser || !userToFollowUnfollow) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (currentUser.following.includes(userIdToFollowUnfollow)) {
            // Unfollow logic
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== userIdToFollowUnfollow
            );
            userToFollowUnfollow.followers = userToFollowUnfollow.followers.filter(
                (id) => id.toString() !== req.id
            );

            await currentUser.save();
            await userToFollowUnfollow.save();

            return res.json({
                success: true,
                message: "User unfollowed successfully.",
            });
        } else {
            // Follow logic
            currentUser.following.push(userIdToFollowUnfollow);
            userToFollowUnfollow.followers.push(req.id);

            await currentUser.save();
            await userToFollowUnfollow.save();

            return res.json({
                success: true,
                message: "User followed successfully.",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id)
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            })
        }

        const { fullName, bio } = req.body;
        if (!fullName || !bio) {
            return res.json({
                success: false,
                message: "All fields are required."
            })
        }
        user.fullName = fullName;
        user.bio = bio;

        let result;
        if (req.file) {
            result = await uploadImage(req.file.path)
            user.profileImg = result.url
        }

        await user.save()
        const updatedUser = await User.findById(user._id).select("-password")
        res.json({
            success: true,
            message: "Profile Updated.",
            updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}


const getUserFollowing = async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({username})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        if (user.following.length === 0) {
            return res.json({
                success: true,
                users: []
            })
        }

        await user.populate({
            path: 'following',
            select: 'fullName username profileImg'
        })

        return res.json({
            success: true,
            users: user.following
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

const getUserFollowers = async (req, res) => {
    try {
        const {username} = req.params
        const user = await User.findOne({username})

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            })
        }

        if (user.followers.length === 0) {
            return res.json({
                success: true,
                users: []
            })
        }

        await user.populate({
            path: 'followers',
            select: 'fullName username profileImg'
        })

        return res.json({
            success: true,
            users: user.followers
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}




module.exports = {
    getUserProfile,
    suggestedUsers,
    followUnfollowUser,
    updateProfile,
    getUserFollowing,
    getUserFollowers
}