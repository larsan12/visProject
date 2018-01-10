const fs = require('fs');

let data = fs.readFileSync("./data/population.csv") + ""

data = data.split("\r\n");
let first = [ "country", "code", "year", "value" ]
data = data.slice(1)

let obj = {}
data.forEach(d => {
    let fields = [];
    let vals = d.split('"');
    if (vals.length == 3) {
        fields.push(vals[1]);
        let vals_spl = vals[2].split(",");
        vals_spl = vals_spl.slice(1);
        vals_spl.forEach(l => fields.push(l))
    } else {
        fields = d.split(",")
    }
    if (!obj[fields[0]]) {
        obj[fields[0]] = {
            code: fields[1]
        }
    }

    obj[fields[0]][fields[2]] = parseInt(fields[3]);

})

fs.writeFileSync("./prepared_data/population.json", JSON.stringify(obj))
