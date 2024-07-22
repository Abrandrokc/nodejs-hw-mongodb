 const  notFoundHandler = (req, res) => {
        res.status(404).json({
           
            masege: "Route not found",
        })
    }
export default  notFoundHandler
