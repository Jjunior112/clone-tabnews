function status(request, response) {
  response.status(200).json({ chave: "Hello world!" });
}

export default status;
