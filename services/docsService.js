let docsService = {
  readme: async (docsData, callback) => {
    callback({ message: 'Refer here in case of queries.' })
  }
}

module.exports = docsService;