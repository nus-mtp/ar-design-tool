using UnityEngine;
using UnityEngine.UI;
using Vuforia;
using System.Collections;

public class IndividualIngredientTouchListener : AbstractTouchListener{
    private Vector3 scale = new Vector3();
    private float originalHeight = 1920;
    private float originalWidth = 1080;
    private Matrix4x4 svMat;
    private Vector2 styleOffset;

    public Texture whiteBGTexture;
    public Texture blackBGTexture;
    public Texture closeTexture;
    public Ingredient ingredient;

    public GUIStyle titleStyle;
    public GUIStyle descriptionStyle;

	// Use this for initialization
	void Start () {
        enabled = false;
        initializeGUIStyle();
	}

    public override void undo()
    {
        enabled = false;
    }

    public override void touchHandler() {
        createGUI();
        addToUndo();
    }

    private void OnGUI() {
        // setScale();
        Screen.orientation = ScreenOrientation.Portrait;
        drawBackground();
        drawTitleBox();
        drawDescriptionBox();
        // drawBackButton();
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
        styleOffset.y = -20;  
        descriptionStyle.contentOffset = styleOffset;
    }

    private void handleMatrix() {
        svMat = GUI.matrix;
        GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity, scale);
    }

    private void calculateScale() {
        scale.x = Screen.width/originalWidth;
        scale.y = Screen.height/originalHeight;
        scale.z = 1;
    }

    private void drawBackground() {
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height*0.05f), blackBGTexture);
        GUI.DrawTexture(new Rect(0, Screen.height*0.05f, Screen.width, Screen.height), whiteBGTexture);
    }

    private void drawTitleBox() {
        // titleStyle.margin.left = 100;
        
        // Debug.Log("left: " + titleStyle.margin.left);
        GUI.Box(new Rect(0, Screen.height*0.05f, Screen.width, Screen.height *0.075f), ingredient.name, titleStyle);
        // GUI.Box(new Rect(0, Screen.height*0.05f, Screen.width, Screen.height *0.075f), ingredient.name);

    }

    // GUI.Box(new Rect(Screen.width * .1f, 0, Screen.width * .9f, Screen.height * .1f), ingredient.name);
    private void drawDescriptionBox() {
        GUI.Box(new Rect(0, Screen.height * .125f, Screen.width, Screen.height), ingredient.description, descriptionStyle);
        // GUI.Box(new Rect(0, Screen.height * .125f, Screen.width, Screen.height), ingredient.description);
    }

    private void drawBackButton() {
        if (GUI.Button(new Rect(0, 0, Screen.width * .075f, Screen.width * .075f), closeTexture, "")) {
            enabled = false;
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

    void Update() {
        if (Input.GetKey(KeyCode.Escape)) {
            // back button pressed
            enabled = false;
        }
    }
} 