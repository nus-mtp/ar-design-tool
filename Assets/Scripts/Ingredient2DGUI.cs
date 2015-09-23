using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System.IO;

public class Ingredient2DGUI : MonoBehaviour
{

    public Texture backgroundTexture;
    public Texture closeTexture;
    public const string homeSceneName = "WZScene";
    public const string thisSceneName = "2dIngredientDisplay";
    public Ingredient ingredient;
    

    void Start()
    {
        enabled = false;
    }

    void OnGUI()
    {
        drawBackground();
        drawBackButton();
        drawTitleBox();
        drawDescriptionBox();

    }

    void drawBackground()
    {
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), backgroundTexture);
    }

    void drawBackButton()
    {
        if (GUI.Button(new Rect(0, 0, Screen.width * .05f, Screen.width * .05f), closeTexture, ""))
        {
            Debug.Log("Back");
            enabled = false;
        }

    }

    void offGUi()
    {

    }

    void drawTitleBox()
    {
        GUI.Box(new Rect(Screen.width * .1f, 0, Screen.width * .9f, Screen.height * .1f), ingredient.name);
    }

    void drawDescriptionBox()
    {
        GUI.Box(new Rect(0, Screen.height * .1f, Screen.width, Screen.height * .5f), ingredient.description);
    }

    void drawScrollBar()
    {

    }

    public void createGUI()
    {
        Text name = gameObject.transform.GetChild(0).GetComponent<Text>();
        readJson(name.text);
        enabled = true;
   
    }


    private void readJson(string ingredientName)
    {
        TextAsset ta = (TextAsset)Resources.Load("JSON/" + ingredientName);
        string jsonString = ta.text;
        Debug.Log(jsonString);
        ingredient = Ingredient.fromJson(jsonString);
    }

}
