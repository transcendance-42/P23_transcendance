import { } from './user_pic_query.js'
import { allowedMimeType } from '../../utils/constant.js'

async function postUserPic(request, reply) {
	const buffer = await request.body.file.toBuf()
	if (!allowedMimeType.includes())
}

export { postUserPic }