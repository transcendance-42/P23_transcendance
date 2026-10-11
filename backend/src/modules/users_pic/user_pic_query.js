import prisma from '../../utils/prisma.js'

async function creatUserPic(request, filePath) {
	return prisma.users.update({
		where: {
			id: BigInt(request.userId)
		},
		data: {
			file_path: filePath,
			mime_type: request.body.file.mimetype
		}
	})
}

export { creatUserPic }