export var Status;
(function (Status) {
    Status[Status["manufactured"] = 0] = "manufactured";
    Status[Status["assembled"] = 1] = "assembled";
    Status[Status["shipped"] = 2] = "shipped";
    Status[Status["deployed"] = 3] = "deployed";
})(Status || (Status = {}));
