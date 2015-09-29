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
    string buttonType;

    public override void touchHandler()
    {
        Debug.Log("hey, i am" +  gameObject.name);
        spawnIngredientsButton();
    }


    // Use this for initialization
    void Start()
    {
        readJson();
        buttonType = gameObject.name;
    }

    public void spawnIngredientsButton()
    {
        Canvas canvasObject = (Canvas)FindObjectOfType(typeof(Canvas));
        Transform temp;
        RectTransform rt = (RectTransform)ingredientButton;
        float width = rt.rect.width;
        float height = rt.rect.height;
        if (allIngredientsGroup.ContainsKey(buttonType))
        {

            List<string> ingredientGroup = allIngredientsGroup[buttonType];
            int columns = ingredientGroup.Count;

            for (int i = 0; i < columns; i++)
            {
                loadPrefabs(ingredientGroup[i]);
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

    private GameObject loadPrefabs(string prefabName)
    {
        GameObject instance = Instantiate(Resources.Load("Prefabs/" + prefabName, typeof(GameObject))) as GameObject;
        GameObject.FindGameObjectsWithTag(BUTTONTAG);
        GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
        instance.transform.SetParent(tagged[0].transform,false);
        instance.name = prefabName;
        return instance;
    }
}
