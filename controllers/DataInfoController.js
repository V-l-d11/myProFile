import DatInfoModal from '../modals/DataInfo.js'


export const getInfo = async (req, res) => {
    try {
        const info = await DatInfoModal.find('title').exec()
        res.json(info)

    } catch (err) {
        console.log(err)
        res.status(500).json({
           massage: 'Cant watch info '
       }) 
    }
}