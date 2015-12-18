using UnityEngine;
using UnityEngine.UI;
using Vuforia;
using System.Collections;
using System.Collections.Generic;

public class IndividualIngredientTouchListener : AbstractTouchListener{
    private static float descriptionStartHeight;
    private static float titleBoxStartHeight;
    private static float titleBoxEndHeight;
    private static float imagesStartHeight;
    private static float imageHeight;

    private Vector3 scale = new Vector3();
    private float originalHeight = 1920;
    private float originalWidth = 1080;
    private Matrix4x4 svMat;
    private Vector2 styleOffset;

    private Ingredient ingredient;

    public Texture whiteBGTexture;
    public Texture blackBGTexture;
    public Texture closeTexture;

    public GUIStyle titleStyle;
    public GUIStyle imageStyle;
    public GUIStyle descriptionStyle;

    public ModalPanel mp;

    private const string nextScene = "Learn about ";
    
	// Use this for initialization
	void Start () {
        enabled = false;
        if (!mp)
            mp = ModalPanel.Instance();
        mp.Close();
        //initializeGUIStyle();
	}

    public override void touchHandler() {
        string name = gameObject.name;
        readJson(name);
        if (!mp)
            mp = ModalPanel.Instance();
        mp.Display(ingredient.name, ingredient.imageLocation[0], null, ingredient.description);
        addToUndo();
    }

    public override string getNextSceneName()
    {
        return nextScene + ingredient.name;
    }
    private void OnGUI() {
        // setScale();
        // Screen.orientation = ScreenOrientation.Portrait;
        drawBackground();
        drawTitleBox();
        drawImages();
        drawDescriptionBox();
        drawBackButton();
        // GUI.matrix = svMat; // restore matrix
        // Screen.orientation = ScreenOrientation.AutoRotation;
    }

    // private void setScale() {
    //     calculateScale();
    //     handleMatrix();
    // }

    private void initializeGUIStyle() {
        titleStyle.fontSize = 46;
        titleStyle.wordWrap = true;
        descriptionStyle.fontSize = 42;
        descriptionStyle.wordWrap = true;
        styleOffset.x = 10;
        styleOffset.y = 10;
        titleStyle.contentOffset = styleOffset;
        styleOffset.y = 0;  
        descriptionStyle.contentOffset = styleOffset;
        imageStyle.contentOffset = styleOffset;
    }

    // private void handleMatrix() {
    //     svMat = GUI.matrix;
    //     GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
    // }

    // private void calculateScale() {
    //     scale.x = Screen.width/originalWidth;
    //     scale.y = Screen.height/originalHeight;
    //     scale.z = 1;
    // }

    private void drawBackground() {
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height*0.05f), blackBGTexture);
        GUI.DrawTexture(new Rect(0, Screen.height*0.05f, Screen.width, Screen.height), whiteBGTexture);
    }

    private void drawTitleBox() {
        titleBoxStartHeight = Screen.height * 0.05f;
        titleBoxEndHeight = Screen.height * 0.08f;
        GUI.Box(new Rect(0, titleBoxStartHeight, Screen.width, Screen.height *0.08f), ingredient.name, titleStyle);
    }

    private void drawImages(){
        float widthOffset = 0.0f;
        for (int i = 0; i < ingredient.imageLocation.Count; i++) {
            drawImage(widthOffset * i, ingredient.imageLocation[i]);
        }
    }

    private void drawImage(float widthOffset, string imageLocation) {
        Texture ingredientImage = Database.readImage(imageLocation);
        imagesStartHeight = titleBoxEndHeight + Screen.height * 0.02f;
        GUI.Box(new Rect(widthOffset, imagesStartHeight, Screen.width, Screen.height * 0.4f), ingredientImage, imageStyle);
        imageHeight = ingredientImage.height;
        Debug.Log("image height: " + imageHeight);
    }

    private void drawDescriptionBox() {
        descriptionStartHeight = imagesStartHeight + imageHeight;
        GUI.Box(new Rect(0, descriptionStartHeight, Screen.width * 0.95f, Screen.height), ingredient.description, descriptionStyle);
        // GUI.Box(new Rect(0, Screen.height * .125f, Screen.width, Screen.height), ingredient.description);
    }

    private void drawBackButton() {
        float startWidth = Screen.width - Screen.width*0.08f;
        
        if (GUI.Button(new Rect(startWidth, 0, Screen.width * .075f, Screen.width * .075f), closeTexture, "")) {
            UndoStack us = UndoStack.instance;
            us.undoAction();
        }
    }

    public void createGUI() {
        string name = gameObject.name;
        readJson(name);
        enabled = true;
    }

    private void readJson(string ingredientName) {
        string jsonString = Database.readJSON(ingredientName);
        Debug.Log(jsonString);
        ingredient = Ingredient.fromJson(jsonString);
    }

    public override void undo() { 
        enabled = false;
        if (!mp)
            mp = ModalPanel.Instance();
        mp.Close();
    }

    void Update() {
        
    }
} 