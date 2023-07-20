import fs from "fs"

export async function GetImages(req: any, res: any) {
    const dirData = await fs.readdirSync("./public/images", {withFileTypes: true})

    const imgDirData: { type: string; data: string[] }[] = []

    await dirData.map(async dataObj => {
        // console.log(dataObj.name)
        
        const dirDataObj = await fs.readdirSync(`./public/images/${dataObj.name}`)
        
        // console.log(dirDataObj)

        imgDirData.push({
            type: dataObj.name,
            data: dirDataObj
        })

    })

    return res.send(imgDirData).status(200)
}