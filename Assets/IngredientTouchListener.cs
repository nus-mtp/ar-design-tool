using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System;
using Vuforia;
using LitJson;

public class IngredientTouchListener : AbstractTouchListener {

    Dictionary<string, List<string>> allIngredientsGroup;
    public Transform ingredientButton;
    private const string BUTTONTAG = "GroupLayer1";
    string jsonFileName = "IngredientsGroup";
    string ButtonType ="vitamins";

    public override void touchHandler()
    {
        Debug.Log("hey, i am ButtonType");
        spawnIngredientsButton(ButtonType);
    }


    // Use this for initialization
    void Start()
    {
        readJson();
    }

    public void spawnIngredientsButton(string ButtonType)
    {
        Canvas canvasObject = (Canvas)FindObjectOfType(typeof(Canvas));
        Transform temp;
        RectTransform rt = (RectTransform)ingredientButton;
        float width = rt.rect.width;
        float height = rt.rect.height;
        if (allIngredientsGroup.ContainsKey(ButtonType))
        {

            List<string> ingredientGroup = allIngredientsGroup[ButtonType];
            int columns = ingredientGroup.Count;

            for (int i = 0; i < columns; i++)
            {
                temp = Instantiate(ingredientButton) as Transform;
                temp.SetParent(canvasObject.transform, true);
                temp.localScale = new Vector3(1, 1, 1);
                temp.localPosition = new Vector3((-columns / 2 + i) * width, 20, 0);
                temp.localRotation = Quaternion.identity;
                Text name = temp.GetChild(0).GetComponent<Text>();
                Debug.Log(name.text);
                name.text = ingredientGroup[i];
            }

            GameObject[] tagged = GameObject.FindGameObjectsWithTag(BUTTONTAG);
            foreach (GameObject button in tagged)
            {
                button.SetActive(false);
            }
        }

    }

    private void readJson()
    {
        TextAsset ta = (TextAsset)Resources.Load("JSON/IngredientsGroup");
        string jsonString = ta.text;
        allIngredientsGroup = JsonMapper.ToObject<Dictionary<string, List<string>>>(jsonString);
    }
}
