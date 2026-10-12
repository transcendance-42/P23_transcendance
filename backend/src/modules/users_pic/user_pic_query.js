import prisma from '../../utils/prisma.js'

async function updateUserPic(request, filePath) {
	return prisma.users.update({
		where: { id: BigInt(request.userId) },
		data: {
			file_path: filePath,
			mime_type: request.body.file.mimetype
		}
	})
}

async function findPicPathByUserId(id) {
	return prisma.users.findUnique({
		where: { id: BigInt(id) },
		select: {
            file_path: true,
            mime_type: true
        }
	})
}

async function deleteUserPic(id) {
	return prisma.users.update({ 
		where: { id: BigInt(id) },
		data: {
			file_path: null,
			mime_type: null
		}
	})
}

export { updateUserPic, findPicPathByUserId, deleteUserPic }