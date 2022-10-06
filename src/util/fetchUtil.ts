import { TagDto } from "../types/dto"

export function tagFetchResponse (data: any) {

    return {
        id: data?.id.toString(),
        name: data?.name,
        tagType: data?.tagType,
        description: data?.description,
        examType: data?.examType,
        timeLimit: data?.timeLimit,
        datePublished: new Date(data?.datePublished),
        problemList: data?.problemList
    } as TagDto
}

export function problemFetchResponse (data: any) {
    

}




    // "id": 1,
    // "name": "วิชาสามัญ 1 ปี 2555",
    // "tagType": "PASTPAPER",
    // "description": "Lorem ipsum ...",
    // "tagId": 1,
    // "examType": "PAPER",
    // "timeLimit": 90,
    // "datePublished": "2012-01-07T00:00:00.000Z",