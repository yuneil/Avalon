function preres(data, code, msg) {
    if (!code) code = 0;
    var re = {
        "code": code,
        "data": data
    }
    if (error) re.msg = msg;
    return re;
}