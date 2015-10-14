using UnityEngine;
using System.Collections;

public class ButtonListener : AbstractTouchListener{
    public Renderer rend;
    public const string buttonTag = "IngredientButton";
    public GameObject[] buttonsArray;

    public override void touchHandler()
    {

       Debug.Log("I am button, this is my name:" + gameObject.name);
       loadModel();
       destroyButtons();
    }

    private void destroyButtons()
    {
        buttonsArray = GameObject.FindGameObjectsWithTag(buttonTag);
        foreach (GameObject g in buttonsArray)
        {
            g.SetActive(false);
        }
    }
    private void loadModel(){
        loadPrefabs(gameObject.name);
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
