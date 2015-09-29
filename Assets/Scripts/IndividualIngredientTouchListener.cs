using UnityEngine;
using UnityEngine.UI;
using Vuforia;
using System.Collections;

public class IndividualIngredientTouchListener : AbstractTouchListener{
    public Texture backgroundTexture;
    public Texture closeTexture;
    public Ingredient ingredient;
    

	// Use this for initialization
	void Start () {
        enabled = false;
	}

    public override void touchHandler()
    {
        createGUI();
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
            enabled = false;
        }

    }

    void drawTitleBox()
    {
        GUI.Box(new Rect(Screen.width * .1f, 0, Screen.width * .9f, Screen.height * .1f), ingredient.name);
    }

    void drawDescriptionBox()
    {
        GUI.Box(new Rect(0, Screen.height * .1f, Screen.width, Screen.height * .5f), ingredient.description);
    }



    public void createGUI()
    {
        string name = gameObject.name;
        readJson(name);
        enabled = true;

    }


    private void readJson(string ingredientName)
    {
        string jsonString = Database.readIngredient(ingredientName);
        Debug.Log(jsonString);
        ingredient = Ingredient.fromJson(jsonString);
    }


}
