import { useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [passo, setPasso] = useState(1);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(10);

  function incrementar() {
    const novoValor = valor + passo;
    if (novoValor > maximo) {
      setValor(maximo);
    } else {
      setValor(novoValor);
    }
  }

  function decrementar() {
    const novoValor = valor - passo;
    if (novoValor < minimo) {
      setValor(minimo);
    } else {
      setValor(novoValor);
    }
  }

  function resetar() {
    if (minimo > 0) {
      setValor(minimo);
    } else {
      setValor(0);
    }
  }

  function mudarPasso(e) {
    const num = Number(e.target.value);
    if (num > 0) {
      setPasso(num);
    }
  }

  function mudarMinimo(e) {
    const num = Number(e.target.value);
    setMinimo(num);
    if (num > maximo) {
      setMaximo(num);
    }
    if (valor < num) {
      setValor(num);
    }
  }

  function mudarMaximo(e) {
    const num = Number(e.target.value);
    setMaximo(num);
    if (num < minimo) {
      setMinimo(num);
    }
    if (valor > num) {
      setValor(num);
    }
  }

  return (
    <div style={{ maxWidth: 320, margin: "40px auto", fontFamily: "Arial, sans-serif", border: "2px solid #333", borderRadius: 8, padding: 20 }}>
      <h2 style={{ textAlign: "center", marginTop: 0 }}>Contador</h2>

      <div style={{ textAlign: "center", fontSize: 48, fontWeight: "bold", margin: "10px 0" }}>
        {valor}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={decrementar} style={{ padding: "8px 16px", fontSize: 18 }}>-</button>
        <button onClick={resetar} style={{ padding: "8px 16px" }}>reset</button>
        <button onClick={incrementar} style={{ padding: "8px 16px", fontSize: 18 }}>+</button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Passo: </label>
        <input type="number" value={passo} min="1" onChange={mudarPasso} style={{ width: 60 }} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Minimo: </label>
        <input type="number" value={minimo} onChange={mudarMinimo} style={{ width: 60 }} />
      </div>

      <div>
        <label>Maximo: </label>
        <input type="number" value={maximo} onChange={mudarMaximo} style={{ width: 60 }} />
      </div>
    </div>
  );
}
