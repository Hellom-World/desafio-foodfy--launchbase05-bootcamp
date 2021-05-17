module.exports = {
    

    noEmpty(value) {
        return value != "";
    },
    date(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
		const month = `0${date.getUTCMonth() + 1}`.slice(-2)
		const day = `0${date.getUTCDate()}`.slice(-2)

        //return yyyy-mm-dd
        console.log(`${year}-${month}-${day}`)
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay:`${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    }
}