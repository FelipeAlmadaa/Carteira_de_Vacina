using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;

[CreateAssetMenu(fileName = "Pergunta", menuName = "Quiz/Pergunta", order = 1)]
public class Pergunta : ScriptableObject
{
    [Multiline]
    public string enunciado;
    public Dificuldade dificuldade;
    [Multiline]
    public string[] alternativas;
    public int respostaCorreta;
}

public enum Dificuldade { FACIL, MEDIO, DIFICIL }
