

exports.markerAddUpdateSchema = {
    name: {
      type: "string",
      required: true
    },
    address: {
      type: "string",
      required: true
    },
    description : {
       type: "string",
       required: true
    },
    order: {
      type: "string",
      required: true
    },
    category: {
      type: "string",
      required: true
    },
    latitude: {
      type: "string",
      required: true
    },
    longitude: {
      type: "string",
      required: true
    },
     userId: {
      type: "string",
      required: true
    }
}

exports.markerListAddUpdateSchema = {
    name: {
      type: "string",
      required: true
    },
    views: {
      type: "number",
      required: true
    },
    _private : {
       type: "string",
       required: true
    },
    markers: {
      type: "array",
      required: true
    },
    category: {
      type: "string",
      required: true
    },
     userId: {
      type: "string",
      required: true
    }

}

exports.personAddUpdateSchema = {
    name: {
      type: "string",
      required: true
    },
    email: {
      type: "string",
      required: true
    },
    pass : {
       type: "string",
       required: true
    },
}

