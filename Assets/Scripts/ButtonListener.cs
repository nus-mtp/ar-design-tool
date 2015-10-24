using UnityEngine;
using System.Collections;

public class ButtonListener : AbstractTouchListener{
    private Renderer rend;
    public const string buttonTag = "IngredientButton";
    private GameObject[] buttonsArray;
    private GameObject model;

    public override void touchHandler()
    {

       Debug.Log("I am button, this is my name:" + gameObject.name);
       loadModel();
       destroyButtons();
       addToUndo();
    }

    public override void undo()
    {
        reLoadButtons();
        destroyModel();
    }

    public override string getNextSceneName()
    {
        return gameObject.name;
    }

    private void destroyButtons()
    {
        buttonsArray = GameObject.FindGameObjectsWithTag(buttonTag);
        foreach (GameObject g in buttonsArray)
        {
            g.SetActive(false);
        }
    }

    private void reLoadButtons()
    {
        foreach (GameObject g in buttonsArray)
        {
            g.SetActive(true);
        }
    }

    private void loadModel(){
        model = loadPrefabs(gameObject.name);
    }

    private void destroyModel(){
        Destroy(model);
    }
	// Use this for initialization
	void Start () {
        rend = GetComponent<Renderer>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    private GameObject loadPrefabs(string prefabName)
    {
        GameObject instance = Instantiate(Database.loadPrefab(prefabName));
        GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
        instance.transform.SetParent(tagged[0].transform, false);
        instance.name = prefabName;
        return instance;
    }

}
