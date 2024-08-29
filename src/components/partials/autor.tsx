const autor = ({ foto, nome, data }) => {
  return (
    <div className="autor">
      <img src={foto} alt={nome} />
      <span>teste</span>
      <span>teste</span>
      <span>teste</span>
    </div>
  );
}

export default autor;