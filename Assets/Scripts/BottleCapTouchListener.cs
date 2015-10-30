using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {

    bool shake;
	bool statusTracked;
	public static bool isClicked = false;
	private GameObject arrow;
	private GameObject interactable;
	private GameObject textToTap;

	bool isFlickering = true;
	float jumpUpTime = 1.5f;
	float jumpDownTime = 1.5f;
	float jumpUpTimeCounter;
	float jumpDownTimeCounter;
	
    float shakeTimeLimit;

    private const string nextScene = "Tap the pill";

	void Start(){
        shake = false;
        shakeTimeLimit = 0.0f;

		arrow = GameObject.Find("Arrow");
		interactable = GameObject.Find ("Interactable");
		textToTap = GameObject.Find ("TextToTap");
    }

    public override void undo()
    {
        Debug.Log("Bottle cap touch listener is undoing");
        arrow.SetActive(true);
		interactable.SetActive (true);
		textToTap.SetActive (true);

		gameObject.SetActive (true);
		DestroyPill ();
		//set the new method
		isFlickering = true;
    }

    public override string getNextSceneName()
    {
        return nextScene;
    }

	void Update(){
		statusTracked = TouchController.objectIsFound;
        isShake();

		if (statusTracked) {
			if (isFlickering == true) {
				jumpUpAndDown();
				resetTimeCounter();
			}
		} 
	}

	
	public void jumpUpAndDown(){
		if (jumpUpTimeCounter < jumpUpTime) {
			jumpUpTimeCounter += Time.deltaTime;
			arrow.transform.Translate (Vector3.up * 10 * Time.deltaTime, Space.World);
		} else {
			if (jumpDownTimeCounter < jumpDownTime) {
				jumpDownTimeCounter += Time.deltaTime;
				arrow.transform.Translate (Vector3.down * 10 * Time.deltaTime, Space.World);
			}
		}
	}

	public void resetTimeCounter(){
		if (jumpDownTimeCounter > 1.5f && jumpUpTimeCounter > 1.5f) {
			jumpDownTimeCounter = 0f;
			jumpUpTimeCounter = 0f;
		}
	}

	public override void touchHandler()
	{
		//spawn the pill

		arrow.SetActive (false);
		interactable.SetActive (false);
		textToTap.SetActive (false);

		isClicked = true;
		isFlickering = false;
		
		spawnPill();
		gameObject.SetActive (false);

		addToUndo();
	}

    public void isShake()
    {
        
        if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 50.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 310.0)
        {
            shake = true;
            shakeTimeLimit = 1.50f;
        }
        if (shake)
        {
            shakeTimeLimit -= Time.deltaTime;
            if (shakeTimeLimit <= 0.0f)
                shake = false;
            if (CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) < 40.0 && CameraProperties.fget(CameraProperties.EULER_ROTATION_Z) > 340.0)
            {
                isClicked = true;
            }
        }
    }
	public void DestroyPill(){
		GameObject Pill = GameObject.Find ("Pill");
		Destroy (Pill);
	}

    public void spawnPill(){
    	GameObject Pill = loadPrefab("Pill");
    }
	
    private GameObject loadPrefab (String prefabName)
    {
    	GameObject instance = Instantiate(Database.loadPrefab(prefabName));
    	GameObject[] tagged = GameObject.FindGameObjectsWithTag("ObjectTarget");
		instance.transform.SetParent(tagged[0].transform,false);
		instance.name = "Pill";
		return instance;
    }
	
}
