using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class Alternativa : MonoBehaviour
{
    [SerializeField]
    private Color corNormal;
    [SerializeField]
    private Color corCorreto;
    [SerializeField]
    private Color corErrado;

    [SerializeField]
    private Image letraBackground;

    [SerializeField]
    private Button botao;

    [SerializeField]
    private TextMeshProUGUI texto;

    public string resposta;
    public bool alternativaCorreta;

    public UnityEvent selecionado;

    // Start is called before the first frame update
    void Start()
    {
        SetAlternativa(resposta, alternativaCorreta);
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public Color corAtivo() {
        return alternativaCorreta? corCorreto : corErrado;
    }

    public void reiniciar() {
        letraBackground.color = corNormal;
        GetComponent<Outline>().effectColor = new Color(0f, 0f, 0f, 0f);
    }

    public void ativarCores() {
        letraBackground.color = corAtivo();
    }

    public void adicionarContorno() {
        GetComponent<Outline>().effectColor = corAtivo();
    }

    public void SetAlternativa(string resposta, bool alternativaCorreta) {
        this.resposta = resposta;

        reiniciar();
        this.alternativaCorreta = alternativaCorreta;
        texto.text = resposta;
    }

    public void Selecionar() {
        selecionado?.Invoke();
    }
}
