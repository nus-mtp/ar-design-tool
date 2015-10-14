using UnityEngine;
using System.Collections;
using System;
using Vuforia;

public class BottleCapTouchListener : AbstractTouchListener {
	Component halo;
	Transform pill;

    bool shake;
	bool statusTracked;
	public static bool isClicked = false;

	float fadeOnLimit = 1.5f;
	float fadeOffLimit = 0.0f;
	float fadeCounter;
    float shakeTimeLimit;
    int up;

    GameObject arrow;

	void Start(){
        shake = false;
        shakeTimeLimit = 0.0f;
        halo = GetComponent ("Halo");
        fadeCounter = 0.0f;
        setHalo(false);
        arrow = GameObject.Find("Arrow");
    }

	void Update(){
		statusTracked = TouchController.objectIsFound;
        isShake();

		if (statusTracked) {
			flickering ();
		}

		if (isClicked == true) {    
			setHalo (false);
            arrow.SetActive(false);
		}
	}

	public void setHalo (bool status){
		halo.GetType ().GetProperty ("enabled").SetValue (halo, status, null);
	}

    public void changeSize (float size){
        RenderSettings.haloStrength -= size;
    }

    public void flickering()
    {
        if (fadeCounter >= fadeOnLimit)
        {
            up = -1;
            setHalo(false);
        }
        else if (fadeCounter <= fadeOffLimit)
        {
            up = 1;
            setHalo(true);
        }
        fadeCounter += 0.05f * up;
    }

	public override void touchHandler()
	{	pill= this.gameObject.transform.GetChild(0);
		pill.gameObject.SetActive (true);

		//disable the glow
		isClicked = true;
        this.gameObject.GetComponent<Collider>().enabled = false;
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
}
