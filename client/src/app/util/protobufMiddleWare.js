import protobuf from 'protobufjs'

async function getRoot(protoFile) {
    return new Promise((resolve, reject) => {
        protobuf.load(protoFile, function (err, root) {
            if (err)
                reject(err)
            console.log(root)
            resolve(root)
        })
    })
}
export default getRoot