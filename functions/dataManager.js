module.exports = {
    add : (fs , filename , jdata , encodeing = "utf8") => {
        fs.readFile(filename, encodeing, function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = JSON.parse(data); 
            obj.push(jdata); 
            json = JSON.stringify(obj);
            fs.writeFileSync(filename, json, encodeing);
            }
        })
    },
    all : (fs , filename , encodeing = "utf8") => {
        fs.readFile(filename, encodeing, function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            obj = data; 
            return obj;
            }
        })
    }
}