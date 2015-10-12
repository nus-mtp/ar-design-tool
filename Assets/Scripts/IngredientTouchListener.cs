using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System;
using Vuforia;
using LitJson;

public class IngredientTouchListener : AbstractTouchListener {

    Dictionary<string, List<string>> allIngredientsGroup;
    List<GameObject> individualIngredientsArr = new List<GameObject>();
    private const string BUTTONTAG = "GroupLayer1";
    string jsonFileName = "IngredientsGroup";
    string buttonType;
    bool ingredientsShown = false;

    public override void touchHandler()
    {
        Debug.Log("hey, i am" +  gameObject.name);
        spawnIngredientsButton();
    }


    // Use this for initialization
    void Start()
    {
        readJson();
        Debug.Log("name: " + gameObject.name);
        buttonType = gameObject.name;
    }

    public void spawnIngredientsButton()
    {
        Canvas canvasObject = (Canvas)FindObjectOfType(typeof(Canvas));
        Transform temp;


        if (ingredientsShown)
        {
            foreach (GameObject go in individualIngredientsArr)
            {
                Destroy(go);
            }
            ingredientsShown = !ingredientsShown;
            Debug.Log(ingredientsShown);
        }
        else
        {
            if (allIngredientsGroup.ContainsKey(buttonType))
            {
                List<string> ingredientGroup = allIngredientsGroup[buttonType];
                int columns = ingredientGroup.Count;
                Debug.Log(columns);

                for (int i = 0; i < columns; i++)
                {
                    individualIngredientsArr.Add(loadPrefabs(ingredientGroup[i]));
                }

                GameObject[] tagged = GameObject.FindGameObjectsWithTag(BUTTONTAG);
                foreach (GameObject button in tagged)
                {
                    button.SetActive(false);
                }

                gameObject.SetActive(true);

            }
            ingredientsShown = !ingredientsShown;
            Debug.Log(ingredientsShown);
        }

    }

    private void readJson()
    {
        string jsonString = Database.readJSON("IngredientsGroup");
        Debug.Log("string: " + jsonString);
        allIngredientsGroup = JsonMapper.ToObject<Dictionary<string, List<string>>>(jsonString);
    }

    private GameObject loadPrefabs(string prefabName)
    {
        GameObject instance = Instantiate(Database.loadPrefab(prefabName));
        GameObject.FindGameObjectsWithTag(BUTTONTAG);
        GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
        instance.transform.SetParent(tagged[0].transform,false);
        instance.name = prefabName;
        return instance;
    }
}
