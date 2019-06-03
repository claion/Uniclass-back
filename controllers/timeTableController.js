import TimeTable from '../models/timeTable';
import createError from 'http-errors';
import http from 'http-status-codes';

// /tables/{id}/ get
export const showTables = async (req, res) => {
    try {
        const {query: {id}} = req;
        const timeTables = await TimeTable.findOne({
            id : id,
            main : true,
        }, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
          });
        res.status(http.ACCEPTED).json({success: true, message: "tables success", data: });
    } catch(error) {
        console.log(error);
        //res.status(http.ACCEPTED).json({success: true, message: "signup success", data: newUser})
    }
} 